import csv
import functools

import numpy as np
import pandas as pd


def to_number(s):
    try:
        s1 = float(s)
        return s1
    except Exception:
        return str(s)


def read_file_old(f):
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


def read_file(f):
    # Write file to disk first
    fp = "/tmp/%s" % f.name
    with open(fp, 'wb') as fout:
        for chunk in f.chunks():
            fout.write(chunk)

    # Next, load file into dataframe
    df = pd.read_csv(fp, sep=None, engine='python')

    # Get row-by-row isnan mask of first 10 rows
    row_has_numbers = df.head(10).applymap(to_number).applymap(np.isreal).all(axis=1)

    # If we have at least one row of numeric data, check if we can collapse the header
    if not row_has_numbers.all():
        header_indices = []

        # Combine any rows that have no numbers to header
        for index, value in row_has_numbers.iteritems():
            if value:
                break
            else:
                header_indices.append(index)

        # Change dataframe column names
        df_headers = [list(df.columns)] + [['' if e is np.nan else str(e) for e in row] for row in
                                           df.iloc[header_indices].values]
        df.drop(df.index[header_indices], inplace=True)

        # Rename columns
        df.columns = functools.reduce(lambda x, y: [x[i] + "," + y[i] if y[i] else x[i] for i in range(len(x))],
                                      df_headers)

    df = df.fillna(0)
    # Get column headers and min/max
    data = [list(df.columns), list(df.min()), list(df.max())]

    return data


