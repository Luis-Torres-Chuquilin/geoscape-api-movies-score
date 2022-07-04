/** @format */

import { useState } from "react";

const useInput = (initialvalue: string) => {
  const [value, setValue] = useState(initialvalue);

  return [
    {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),
    },
    () => setValue(initialvalue),
  ] as const;
};

export default useInput;
