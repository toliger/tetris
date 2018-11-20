// Return the maximal value of x from an array of coordinates
export function getMaxXFromArray(a) {
  let m = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i][0] > m) { m = a[i][0]; }
  }
  return m;
}

// Return the minimal value of x from an array of coordinates
export function getMinXFromArray(a) {
  let m = a[0][0];
  for (let i = 0; i < a.length; i += 1) {
    if (a[i][0] < m) { m = a[i][0]; }
  }
  return m;
}

// Return the maximal value of y from an array of coordinates
export function getMaxYFromArray(a) {
  let m = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i][1] > m) { m = a[i][1]; }
  }
  return m;
}

// Return the minimal value of y from an array of coordinates
export function getMinYFromArray(a) {
  let m = a[0][1];
  for (let i = 0; i < a.length; i += 1) {
    if (a[i][1] < m) { m = a[i][1]; }
  }
  return m;
}

// Return the couple of coordinates where x is maximal
export function getMaxXPos(a) {
  let m = 0;
  let ind = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i][0] > m) {
      m = a[i][0];
      ind = i;
    }
  }
  return a[ind];
}

// Return the couple of coordinates where x is minimal
export function getMinXPos(a) {
  let m = a[0][0];
  let ind = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i][0] < m) {
      m = a[i][0];
      ind = i;
    }
  }
  return a[ind];
}

// Return the couple of coordinates where y is maximal
export function getMaxYPos(a) {
  let m = 0;
  let ind = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i][1] > m) {
      m = a[i][1];
      ind = i;
    }
  }
  return a[ind];
}

// Return the couple of coordinates where y is minimal
export function getMinYPos(a) {
  let m = a[0][1];
  let ind = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i][1] < m) {
      m = a[i][1];
      ind = i;
    }
  }
  return a[ind];
}
