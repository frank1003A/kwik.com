import { 
    TextFields, 
    BorderAll, 
    DateRange, 
    PhotoCamera, 
    MergeType, 
    WrapText,
    Title,
    HMobiledata,
    HorizontalRule,
    QuestionAnswer,
    CheckBoxOutlineBlank,
    Rtt,
    Wysiwyg
 } from '@mui/icons-material'
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
        icon: <CheckBoxOutlineBlank/>,
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
        icon: <Wysiwyg/>,
    },
    {
        id: 6,
        name: 'Text',
        type: 'text',
        icon: <Rtt/>
    },
    {
        id: 7,
        name: 'input',
        type: 'Header',
        icon: <HMobiledata/>
    },
    {
        id: 8,
        name: 'input',
        type: 'Title',
        icon: <Title/>
    },
    {
        id: 9,
        name: 'prompt',
        type: 'Prompt',
        icon: <QuestionAnswer/>
    },
    {
        id: 10,
        name: 'divider',
        type: 'divider',
        icon: <HorizontalRule/>
    }
]

export default components 