import { Empl } from '../api/empl'

// regular expression: https://regexr.com/2rhq7

// export const regexEmailValidation = new RegExp(
//   "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])"
// )

export const regexEmailValidation =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const moreThanThirty = (registered: string) => {
  const registrationDate = new Date(registered).getTime()

  // one month calc = 30 days * 24 hours * 3600 seconds * 1000 milliseconds
  const oneMonth = 30 * 24 * 3600 * 1000

  // date one month ago
  const thirtyDaysAgo = Date.now() - oneMonth

  // return true if registration date is more than 30 days old
  return registrationDate < thirtyDaysAgo
}

interface IEmplEmailFilters {
  all: Empl[]
  invalid: Empl[]
  duplicate: Empl[]
  older: Empl[]
}

const EmplEmailFilters = (employees: Empl[]): IEmplEmailFilters => {
  return {
    all: employees,
    ...employees.reduce(
      (result, empl) => {
        const email = empl.email
        if (!regexEmailValidation.test(empl.email.toLowerCase())) {
          result.invalid.push(empl)
        }
        if (employees.filter(empl => empl.email === email).length > 1) {
          result.duplicate.push(empl)
        }
        if (moreThanThirty(empl.createdAt)) {
          result.older.push(empl)
        }
        return result
      },
      {
        invalid: [],
        duplicate: [],
        older: []
      }
    )
  }
}
export default EmplEmailFilters