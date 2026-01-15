'use client';

import React from "react";

export function Command({value}: {value: string}) {
  return (
      <><span className="text-xs">⌘</span>+ {value} | CTRL + {value}</>
  );
}