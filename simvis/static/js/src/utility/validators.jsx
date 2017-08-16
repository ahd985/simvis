export function unwrapValidators(validators) {
    // validators are in the format of <arg>.<type>.<(opt)min dimensions>.<(opt)max dimensions>&<(opt)comparator>
    let unwrappedValidators = {}
    if (validators) {
        for (let validator in validators) {
            let rv = {};
            const validatorArr1 = validator.split("&");
            if (validator.includes("&")) {
                rv.comparators = validatorArr1.slice(1)
            }

            const validatorArr2 = validatorArr1[0].split(".")
            if (validator.includes(".")) {
                validatorArr2.length > 1 ? rv.type = validatorArr2[1] : null;
                validatorArr2.length > 2 ? rv.minDims = validatorArr2[2] : null;
                validatorArr2.length > 3 ? rv.maxDims = validatorArr2[3] : null;
            }

            // Add a property with the name of the arg
            unwrappedValidators[validatorArr2[0]] = rv;
        }
    }

    return unwrappedValidators
}
