import csv


def read_file(f):
    data = []

    # Write file to disk first
    fp = "/tmp/%s" % f.name
    with open(fp, 'wb') as fout:
        for chunk in f.chunks():
            fout.write(chunk)

    # Next, read file
    with open(fp) as f:
        sniffer = csv.Sniffer()
        first_line = f.readline()
        dialect = sniffer.sniff(first_line)

        data.append(first_line.split(dialect.delimiter))
        reader = csv.reader(f, dialect)
        for row in reader:
            data.append(row)

    return data


