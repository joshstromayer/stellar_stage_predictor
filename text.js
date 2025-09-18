let stellar_classification = 'O'
let mass = 34


// Define ranges in one place
const ranges = {
    O: {
      V:   { absmag: [-5.5, -4.0], mass: [16, 100], radius: [6.6, 15] },
      III: { absmag: [-6.0, -4.5], mass: [20, 60], radius: [15, 25] },
      I:   { absmag: [-8.0, -6.0], radius: [20, 60] }
    },
    // You’d add B, A, F, G, K, M in the same format
  };
  
  // Example classification logic
  let classification = "N/A";
  const classRanges = ranges[stellar_classification];
  
  if (classRanges) {
    for (const [luminosityClass, criteria] of Object.entries(classRanges)) {
    //   const magOk    = !criteria.absmag || (this.gmag > criteria.absmag[0] && this.gmag < criteria.absmag[1]);
      const massOk   = !criteria.mass   || (this.mass > criteria.mass[0] && this.mass < criteria.mass[1]);
    //   const radiusOk = !criteria.radius || (this.radius > criteria.radius[0] && this.radius < criteria.radius[1]);
  
      if (massOk) {
        classification = luminosityClass;
        break;
      }
    }
  }
  
  console.log("Classification:", classification);
  