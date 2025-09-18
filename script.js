const ranges = {
    O: {
        V: {mass_r: [16, 60], radius_r: [6, 15], absmag_r: [-4.5, -5.5]},
        III: {mass_r: [30, 70], radius_r: [30, 70], absmag_r: [-5.5, -7]},
        I: {mass_r: [40, 150], radius_r: [25, 60], absmag_r: [-7, -8.5]},
    },
    B: {
        V: {mass_r: [2, 16], radius_r: [3, 7], absmag_r: [-1, -3]},
        III: {mass_r: [5, 18], radius_r: [10, 20], absmag_r: [-3, -5]},
        I: {mass_r: [15, 25], radius_r: [25, 50], absmag_r: [-5, -7]},
    },
    A: {
        V: {mass_r: [1.6, 3], radius_r: [1.4, 2.5], absmag_r: [1, 0]},
        III: {mass_r: [2, 4], radius_r: [5, 10], absmag_r: [-1, -3]},
        I: {mass_r: [5, 10], radius_r: [20, 30], absmag_r: [-4, -5.5]},
    },
}

class StarCLassifiction {
    constructor(mass, radius, temperature, gmag) {
        this.r = 6.957*10**8
        this.mass = mass
        this.radius_q = radius // multiple of R
        this.radius = radius * this.r
        this.temperature = temperature
        this.gmag = gmag
        this.luminosity = 4*3.14*(this.radius**2)*(5.67*10**-8)*(this.temperature**4)
        this.canvas_star_colour;
    }

    stellar_classification () {
        let stellar_classification = 'N/A';
        let stellar_classification_nl = 'N/A';

        if (this.temperature >=30000) {
            stellar_classification = 'O'
            this.canvas_star_colour = "#0073ff"
        } else if (this.temperature >= 20000) {
            stellar_classification = 'B'
            this.canvas_star_colour = "#4eafff"
        } else if (this.temperature >= 10000) {
            stellar_classification = 'B'
            this.canvas_star_colour = "#c3edff"
        } else if (this.temperature > 7500) {
            stellar_classification = 'A'
            this.canvas_star_colour = "#fdff9a"
        } else if (this.temperature > 6000) {
            stellar_classification = 'F'
            this.canvas_star_colour = "#f4ff21"
        } else if (this.temperature > 5200) {
            stellar_classification = 'G'
            this.canvas_star_colour = "#ffcd4e"
        } else if (this.temperature > 3700) {
            stellar_classification = 'K'
            this.canvas_star_colour = "#e68517"
        } else if (this.temperature > 3000) {
            stellar_classification = 'K'
            this.canvas_star_colour = "#ec7a24"
        } else if (this.temperature > 2400) {
            stellar_classification = 'M'
            this.canvas_star_colour = "#cf2d2d"
        } else if (this.temperature > 1300) {
            stellar_classification_nl = 'L'
        } else if (this.temperature > 700) {
            stellar_classification_nl = 'T'
        } else {
            stellar_classification_nl = 'Y'
        }
        
        if (stellar_classification != 'N/A') {
            return stellar_classification
        } else {
            return stellar_classification_nl
        }
    }

    luminosity_classification () {
        let stellar_classification = this.stellar_classification()

        let classification = 'N/A'

        const stellar_value = ranges[stellar_classification]

        if (stellar_value) {
            for (const[luminosityClass, criteria] of Object.entries(stellar_value)) {
                const mass_t = !criteria.mass_r || this.mass > criteria.mass_r[0] && this.mass < criteria.mass_r[1]
                const radius_t = !criteria.radius_r || this.radius_q > criteria.radius_r[0] && this.radius_q < criteria.radius_r[1]
                const absmag_t = !criteria.absmag_r || this.gmag > criteria.absmag_r[1] && this.gmag < criteria.absmag_r[0]
        
                if (mass_t && radius_t && absmag_t) {
                    classification = luminosityClass
                    break
                }
            }
        }

        return classification;

    }

    draw () {
        const canvas = document.getElementById("myCanvas")
        const ctx = canvas.getContext("2d")

        this.stellar_classification()

    }
}

const model = new StarCLassifiction(13, 14, 20000, -4)

lum_class = model.luminosity_classification()
console.log("Classification: ", lum_class);