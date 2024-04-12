import axios from 'axios'

async function getUniqueDomains(domain) {
    const url = `https://crt.sh/?q=${domain}&output=json`

    try {
        const response = await axios.get(url)
        const { data } = response

        const uniqueDomains = new Set()
        data.forEach(sub => uniqueDomains.add(sub.common_name))

        return uniqueDomains

    } catch (error) {
        throw new Error(`Error while retrieving domains: ${error.message}`)
    }
}

async function main() {
    try {
        if (process.argv.length !== 3) {
            console.error('Args missing!')
            console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <domain>`)
            process.exit(1)
        }

        const domain = process.argv[2]
        const uniqueDomains = await getUniqueDomains(domain)
        const uniqueDomainArray = [...uniqueDomains]

        await Promise.all(uniqueDomainArray.map(async domain => console.log(domain)))
    } catch (error) {
        console.error(error.message)
    }
}

main()
