
import { isCvsAvailable as cvs } from './cvs'
var player = require('play-sound')({})

const implementations = [cvs]
async function main() {
    const zipCode = process.argv[2];
    console.log("Searching for vaccines...")
    while (true) {
        const responses = await Promise.all(implementations.map(impl => impl(zipCode)))
        const availableVaccinesFound = responses.filter(response => response.vaccinesAreAvailable)
        if (availableVaccinesFound.length) {
            player.play('awooga-awooga-awooga.mp3', { afplay: ['-v', 1 ] })
            const vendors = availableVaccinesFound.map(_ => _.vendorName)
            console.log(`Vaccines available at ${vendors.join(", ")}`)
        }
        await new Promise( resolve => setTimeout(resolve, 1000) )
    }
}


main();
