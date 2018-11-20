export default (dec) => {
  if (dec < 10) {
    return `${dec}`;
  }

  switch (dec) {
    case 10: {
      return 'a';
    }

    case 11: {
      return 'b';
    }

    case 12: {
      return 'c';
    }

    case 13: {
      return 'd';
    }

    case 14: {
      return 'e';
    }

    case 15: {
      return 'f';
    }

    default: {
      return '0';
    }
  }
};
