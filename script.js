class StarCLassifiction {
    constructor(mass, radius, temperature, gmag) {
        this.r = 6.957*10**8
        this.mass = mass
        this.radius = radius * this.r
        this.temperature = temperature
        this.gmag = gmag
        this.luminosity = 4*3.14*(this.radius**2)*(5.67*10**-8)*(this.temperature**4)
    }
}