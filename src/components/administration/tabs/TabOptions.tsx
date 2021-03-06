import { Badge } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useEmpl } from '../../../hooks'
import { employeeFilterStateAtom, employeeStateAtom } from '../../../recoil-state'
import { EmailErrorFilter } from '../../../utils'
import { TabStyle, TabWrapper } from '../../mui'
import TabBackground from './TabBackground'
import { ITabData } from './types'

function a11yProps(value: string) {
  return {
    id: `select-tab-${value}`,
    'aria-controls': `select-panel-${value}`
  }
}

export default function TabOptions() {
  const [employeeFilterState, setEmployeeFilterState] = useRecoilState(employeeFilterStateAtom)

  const { employees } = useEmpl()

  const employeeState = useRecoilValue(employeeStateAtom)

  const filteredEmails = EmailErrorFilter(employeeState)

  const InvalidLabel = filteredEmails?.invalid.length === 0 ? 'No invalid' : 'Invalid'
  const DuplicateLabel = filteredEmails?.duplicate.length === 0 ? 'No duplicate' : 'Duplicate'
  const OldLabel = filteredEmails?.old.length === 0 ? 'No old' : 'Old'

  const tabData: ITabData[] = [
    {
      label: 'Registrants',
      value: 'all',
      errorQuantity: employees.length,
      disable: false
    },
    {
      label: `${InvalidLabel}`,
      value: 'invalid',
      errorQuantity: filteredEmails?.invalid.length,
      disable: filteredEmails?.invalid.length === 0
    },
    {
      label: `${DuplicateLabel}`,
      value: 'duplicate',
      errorQuantity: filteredEmails?.duplicate.length,
      disable: filteredEmails?.duplicate.length === 0
    },
    {
      label: `${OldLabel}`,
      value: 'old',
      errorQuantity: filteredEmails?.old.length,
      disable: filteredEmails?.old.length === 0
    }
  ]

  const handleChange = (event: React.SyntheticEvent, value: string) => {
    event.preventDefault()
    setEmployeeFilterState(value)
  }

  return (
    <TabWrapper>
      <TabBackground />
      <Tabs
        aria-label='selector tabs'
        variant='scrollable'
        scrollButtons='auto'
        value={employeeFilterState}
        onChange={handleChange}
        sx={{ gridColumn: 2, gridRow: 1 }}>
        {tabData.map((tab) => (
          <TabStyle
            key={tab.value}
            label={tab.label}
            value={tab.value}
            disabled={tab.disable}
            {...a11yProps(tab.value)}
            icon={
              <Badge
                color={tab.value === 'all' ? 'info' : 'error'}
                badgeContent={tab.errorQuantity}
                sx={{
                  pl: '14px',
                  mr: '14px',
                  right: -4,
                  top: -2,
                  display: tab.errorQuantity === 0 && 'contents'
                }}
              />
            }
            iconPosition='end'
          />
        ))}
      </Tabs>
    </TabWrapper>
  )
}
