import React, {useState, useRef} from 'react'
import Slider from 'rc-slider'
import useOnClickOutside from '../hooks/useOnClickOutside'
import styles from '../styles/Invoice.module.css'
import 'rc-slider/assets/index.css'

interface Props {
  className?: string
  placeholder?: string
  value?: string
  width?: number
  onChangeImage?: (value: string) => void
  onChangeWidth?: (value:string | number | number[]) => void
  pdfMode?: boolean
}

const EditableFileImage = ({ className, placeholder, value, width, onChangeImage, onChangeWidth, pdfMode }: Props) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const widthWrapper = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const marks = {
    100: '100px',
    150: '150px',
    200: '200px',
    250: '250px'
  }

  const handleClickOutside = () => {
    if (isEditing) {
      setIsEditing(false)
    }
  }

  useOnClickOutside(widthWrapper, handleClickOutside)

  const handleUpload = () => {
    fileInput?.current?.click()
  }

  const handleChangeImage = () => {
    if (fileInput?.current?.files) {
      const files = fileInput.current.files

      if (files.length > 0 && typeof onChangeImage === 'function') {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
          if (typeof reader.result === 'string') {
            onChangeImage(reader.result)
          }
        })

        reader.readAsDataURL(files[0])
      }
    }
  }

  const handleChangeWidth = (value: number | number[]) => {
    if (typeof onChangeWidth === 'function') {
      onChangeWidth(Number(value))
    }
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const clearImage = () => {
    if (typeof onChangeImage === 'function') {
      onChangeImage('')
    }
  }

  return (
    <div className={`${styles.image} ${value ? 'mb-5' : ''} ${className ? className : ''}`}>
      {!value ? (
        <button
          type="button"
          className={styles["image__upload"]}
          onClick={handleUpload}
        >
          {placeholder}
        </button>
      ) : (
        <>
          <img
            src={value}
            id="imagefile"
            className={styles["image__img"]}
            alt={placeholder}
            style={{ maxWidth: width || 100}}
          />

          <button
            type="button"
            className={styles["image__change"]}
            onClick={handleUpload}
          >
            Change Image
          </button>

          <button
            type="button"
            className= {styles["image__edit"]}
            onClick={handleEdit}
          >
            Resize Image
          </button>

          <button
            type="button"
            className={styles["image__remove"]}
            onClick={clearImage}
          >
            Remove
          </button>

          {isEditing && (
            <div ref={widthWrapper} className={styles["image__width-wrapper"]}>
              <Slider min={100} max={250} marks={marks} included={false} step={1} onChange={handleChangeWidth} defaultValue={width || 100} />
            </div>
          )}
        </>
      )}

      <input
        ref={fileInput}
        tabIndex={-1}
        type="file"
        accept="image/*"
        className={styles["image__file"]}
        onChange={handleChangeImage}
      />
    </div>
  )
}

export default EditableFileImage

/**
 if (pdfMode) {
    if (value) {
      return (
        <Image
          style={{...compose(`image ${className ? className : ''}`), maxWidth: width}}
          src={value}
        />
      )
    } else {
      return <></>
    }
  }

 */

