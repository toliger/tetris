export default (dec) => {
  if (dec < 11) {
    return `${dec}`;
  }

  switch(dec) {
    case 11: {
      return 'a';
    }

    case 12: {
      return 'b';
    }

    case 13: {
      return 'c';
    }

    case 14: {
      return 'd';
    }

    case 15: {
      return 'e';
    }

    case 16: {
      return 'f';
    }
  }
}
