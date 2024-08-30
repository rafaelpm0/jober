"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false); // Adicionado cleanup
  }, []);

  return mounted ? createPortal(<>{children}</>, document.body) : null;
}