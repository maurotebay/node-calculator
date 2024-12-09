export default function calculate (eq) {
  const eqArr = parse(eq);
  const result = iterate(eqArr);

  return result;
};

const iterate = (arr, op = []) => {
  const elem = arr.shift();
  const next = arr[0];

  if (next === undefined || next === null) {
    if (op.length === 0) return elem;
    else return resolve([...op, elem]);
  }

  if (elem === "(") {
    return iterate([iterate(arr), ...arr.slice(arr.indexOf(")") + 1)], op);
  }
  if (elem === "-(") {
    return iterate([-iterate(arr), ...arr.slice(arr.indexOf(")") + 1)], op);
  }
  if (elem === "/(") {
    return iterate([1 / iterate(arr), ...arr.slice(arr.indexOf(")") + 1)], op);
  }

  if (elem === "-") {
    if (typeof next === "number") arr[0] = -arr[0];
    else arr[0] = "-(";
  }
  if (elem === "/") {
    if (typeof next === "number") arr[0] = 1 / arr[0];
    else arr[0] = "/(";
  }

  if (op.length == 0) {
    switch (next) {
      case "+":
      case "-":
        return elem + iterate(arr);
      case "*":
      case "/":
        return iterate(arr, [elem, next]);
      case ")":
        if (arr.length > 1) return resolve([...op, elem]);
        else return elem;
      default:
        return iterate(arr);
    }
  } else {
    switch (next) {
      case "+":
      case "-":
        return resolve([...op, elem]) + iterate(arr);
      case "*":
      case "/":
        return iterate(arr, [...op, elem, next]);
      case ")":
        return resolve([...op, elem]);
      default:
        return iterate(arr, op);
    }
  }
};

const resolve = (arr) => {
  const elem = arr.shift();
  const next = arr[0];
  switch (next) {
    case "+":
      return elem + resolve(arr);
    case "-":
      return elem - resolve(arr);
    case "*":
      return elem * resolve(arr);
    case "/":
      if (arr[1] === Infinity) throw new Error("Can not divide by 0");
      else return elem * resolve(arr);
    case undefined:
      return elem;
    default:
      return resolve(arr);
  }
};

const parse = (eq) => {
  const eqArr = [];
  let num = "";

  for (let i = 0; i < eq.length; i++) {
    const char = eq[i];
    if (/\d/.test(char)) {
      num += char;
    } else if ("+-*/()".includes(char)) {
      if (num) {
        eqArr.push(Number(num));
      } else if (
        (char !== "(" && eqArr[i - 2] !== ")" && char !== "-") ||
        (eqArr[i - 2] === "(" && char !== "-")
      ) {
        throw new Error("Syntax Error: Double operator detected");
      }
      if (i === eq.length - 1 && char !== ")") {
        throw new Error("Syntax Error: Can not end in operation");
      }
      num = "";
      eqArr.push(char);
    } else if (char !== " ") {
      throw new Error("Invalid character detected");
    }
  }
  if (num) {
    eqArr.push(Number(num));
  }

  return eqArr;
};
