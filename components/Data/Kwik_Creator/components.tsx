import { TextFields, BorderAll, DateRange, PhotoCamera, MergeType } from '@mui/icons-material'
import styles from '../../../styles/Invoice.module.css'
import EditableImageFile from '../../EditableImageFile'
import { Components } from './types'

const logoContainer: JSX.Element[] = [
    <div className={styles.title} id="dflogo">
          <EditableImageFile
            className="logo"
            placeholder="Company Logo"
          />
        </div>
]

const components: Components[] = [
    {
        id: 1,
        name: 'input', 
        type: "text",
        icon: <TextFields/>,
        /**component: <input contentEditable="true" type="text"/> */
    },
    {
        id: 2,
        name: 'input', 
        type: "date",
        icon: <DateRange/>,
    },
    {
        id: 3,
        name: 'container',
        type: 'div', 
        icon: <BorderAll/>,
    },
    {
        id: 4,
        name: 'logo',
        type: 'image', 
        icon: <PhotoCamera/>,
    },
    {
        id: 5,
        name: 'input',
        type: 'TextareaAutosize', 
        icon: <MergeType/>,
    }


]

export default components 