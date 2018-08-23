import * as deno from "deno";
import * as testing from "./testing/testing.ts";
export { assert, assertEqual } from "./testing/testing.ts";

const permFilter = deno.argv[1];
permFromString(permFilter);
testing.setFilter(permFilter);

interface DenoPermissions {
  write?: boolean;
  net?: boolean;
}

export function permToString(perms: DenoPermissions): string {
  const w = perms.write ? 1 : 0;
  const n = perms.net ? 1 : 0;
  return `permW${w}N${n}`;
}

export function permFromString(s: string): DenoPermissions {
  const re = /^permW([01])N([01])$/;
  const found = s.match(re);
  if (!found) {
    throw Error("Not a permission string");
  }
  return {
    write: Boolean(Number(found[1])),
    net: Boolean(Number(found[2]))
  };
}

testing.test(function permSerialization() {
  for (let write of [true, false]) {
    for (let net of [true, false]) {
      let perms: DenoPermissions = { write, net };
      testing.assertEqual(perms, permFromString(permToString(perms)));
    }
  }
});

export function testPerm(perms: DenoPermissions, fn: testing.TestFunction) {
  testing.test({
    fn,
    name: `${fn.name}_${permToString(perms)}`
  });
}

export function test(fn: testing.TestFunction) {
  testPerm({ write: false, net: false }, fn);
}
