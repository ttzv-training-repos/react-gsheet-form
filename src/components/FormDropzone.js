import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'

const MAX_FILES_SIZE_MB = 10

const FormDropzone = ({ name, setFieldValue }) => {
  const [files, setFiles] = useState([])
  const onDrop = useCallback(acceptedFiles => {
    setFieldValue('files', acceptedFiles)
    const tSize = getSize(acceptedFiles)
    if (tSize < 10) {
      setFiles(acceptedFiles)
    } else {
      alert('Zbyt duży rozmiar plików.')
    }
    if (acceptedFiles.length > 3) alert('Zbyt wiele plików.')
  }, [])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, maxFiles: 3, multiple: true })

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  }

  const activeStyle = {
    borderColor: '#2196f3',
  }

  const acceptStyle = {
    borderColor: '#00e676',
  }

  const rejectStyle = {
    borderColor: '#ff1744',
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  const getSize = fileArray => {
    return fileArray
      .map(file => file.size)
      .reduce((totalSize, currentSize) => {
        return (totalSize += currentSize / 1024 / 1024)
      }, 0)
      .toFixed(2)
  }

  const clearFiles = () => {
    setFiles([])
  }

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps({ name: name })} />
        {isDragActive ? (
          <p>Upuść pliki tutaj</p>
        ) : (
          <p>Kliknij lub przeciągnij i upuść pliki tutaj</p>
        )}
        <div>
          {files.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      </div>
      <ProgressBar
        now={(getSize(files) / MAX_FILES_SIZE_MB) * 100}
        label={
          <em>
            {getSize(files)} MB / {MAX_FILES_SIZE_MB} MB
          </em>
        }
      />
      {files.length > 0 ? <TrashButton onClick={clearFiles} /> : null}
    </>
  )
}

const TrashButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer', width: 'fit-content' }}
      title="Usuń pliki"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        className="bi bi-trash"
        viewBox="0 0 16 16"
      >
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
        <path
          fillRule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
        />
      </svg>
    </div>
  )
}

FormDropzone.propTypes = {
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
}

TrashButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default FormDropzone
