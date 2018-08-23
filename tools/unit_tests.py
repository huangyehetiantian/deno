#!/usr/bin/env python
from util import run
import sys


def unit_tests(deno_exe):
    run([deno_exe, "js/unit_tests.ts", "permW0N0"])
    run([deno_exe, "js/unit_tests.ts", "permW1N0", "--allow-write"])
    run([deno_exe, "js/unit_tests.ts", "permW0N1", "--allow-net"])
    run([
        deno_exe, "js/unit_tests.ts", "permW1N1", "--allow-write",
        "--allow-net"
    ])


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print "Usage ./tools/unit_tests.py out/debug/deno"
        sys.exit(1)
    unit_tests(sys.argv[1])
