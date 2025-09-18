let stellar_classification = 'B'
let mass = 13
let radius = 14
let absmag = -4

const ranges = {
    O: {
        V: {mass: [16, 60], radius: [6, 15], absmag: [-4.5, -5.5]},
        III: {mass: [30, 70], radius: [30, 70], absmag: [-5.5, -7]},
        I: {mass: [40, 150], radius: [25, 60], absmag: [-7, -8.5]},
    },
    B: {
        V: {mass: [2, 16], radius: [3, 7], absmag: [-1, -3]},
        III: {mass: [5, 18], radius: [10, 20], absmag: [-3, -5]},
        I: {mass: [15, 25], radius: [25, 50], absmag: [-5, -7]},
    },
    A: {
        V: {mass: [1.6, 3], radius: [1.4, 2.5], absmag: [1, 0]},
        III: {mass: [2, 4], radius: [5, 10], absmag: [-1, -3]},
        I: {mass: [5, 10], radius: [20, 30], absmag: [-4, -5.5]},
    },
}

let classification = 'N/A'
const stellar_value = ranges[stellar_classification]


if (stellar_value) {
    for (const[luminosityClass, criteria] of Object.entries(stellar_value)) {
        const mass_t = !criteria.mass || mass > criteria.mass[0] && mass < criteria.mass[1]
        const radius_t = !criteria.radius || radius > criteria.radius[0] && radius < criteria.radius[1]
        const absmag_t = !criteria.absmag || absmag > criteria.absmag[1] && absmag < criteria.absmag[0]

        if (mass_t && radius_t && absmag_t) {
            classification = luminosityClass
            break
        }
    }
}

console.log(classification)