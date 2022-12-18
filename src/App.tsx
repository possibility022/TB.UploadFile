import { ContainerClient } from '@azure/storage-blob';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { CollapsedTextBox } from './components/CollapsedTextBox';
import { ErrorMessage } from './components/ErrorMessage';
import { ProgressBar } from './components/ProgressBar';
import { ProgressCounter } from './components/ProgressCounter';
import { Buffer } from 'buffer'


function App() {

  const [files, setFiles] = useState<FileList>()
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(event.target.files)
      setAllFiles(event.target.files.length)
      setCurrentIndex(0)
    }
  }

  const [errorMessage, setErrorMessage] = useState<string>();

  const [accessString, setAccessString] = useState<string>('');
  const [accessUrl, setAccessUrl] = useState<string>();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [allFiles, setAllFiles] = useState(0);
  const [bytesTransfered, setBytesTransfered] = useState(0);
  const [bytestToTransfer, setBytestToTransfer] = useState(0);

  useEffect(() => {
    const parsed = queryString.parse(window.location.search)
    const accessString: string = parsed['accessString'] as string

    if (accessString) {
      setAccessString(accessString)
      try {
        const buffer = Buffer.from(accessString, 'base64')
        const accessUrl = buffer.toString('utf-8')
        setAccessUrl(accessUrl)
      } catch (error) {
        setErrorMessage('Wygląda na to, że twój klucz jest niepoprawny :(. Poproś o nowy link.')
      }
    } else {
      setErrorMessage('Wygląda na to, że twój link nie posiada klucza. Poproś o właściwy link :)')
    }

  }, [])

  const upload = async () => {

    if (!files) {
      setErrorMessage('Nie wybrano plików :)')
      return;
    }

    if (!accessUrl) {
      setErrorMessage('Klucz dostępu jest pusty :(')
      return
    }

    const container = new ContainerClient(accessUrl);

    setErrorMessage('')

    for (let index = 0; index < files.length; index++) {
      setCurrentIndex(index + 1)
      let file = files[index]
      await uploadSingleFile(file, container)
    }
  }

  const uploadSingleFile = async (file: File, container: ContainerClient) => {
    try {
      setBytestToTransfer(file.size)
      setBytesTransfered(0)
      const blob = container.getBlobClient(file.name);
      var blobBlock = blob.getBlockBlobClient();
      await blobBlock.uploadData(file, {
        onProgress: (s) => {
          setBytesTransfered(s.loadedBytes)
        }
      });
    } catch (error) {
      // use state is not working as expected on async. Find out why.
      let current = errorMessage;
      if (!current)
        current = "";

      current += "\r\n";
      current += error?.toString()
      setErrorMessage(current)
    }
  }

  return <div>
    <h1>Wyślij do Tomka :)</h1>

    <br></br>
    <label htmlFor="inputFile">Plik do wysłania
      <br></br>
      <input id="inputFile" type="file" multiple={true} onChange={(e) => onFileChange(e)} />
    </label>

    <br></br>

    <ProgressCounter currentState={currentIndex} maxState={allFiles}></ProgressCounter>
    <ProgressBar maxValue={bytestToTransfer} state={bytesTransfered}></ProgressBar>

    <button onClick={upload}>
      Wyślij Plik
    </button>

    <ErrorMessage message={errorMessage} />

    <CollapsedTextBox buttonText='Wyświetl klucz' content={accessString} />

  </div>

}

export default App;
