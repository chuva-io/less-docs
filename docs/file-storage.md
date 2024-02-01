---
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# File Storage

All Less deployments come with a built in File storage.

## Import the File Storage module

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    Import `files` from `@chuva.io/less`.
    ```js showLineNumbers
    const { files } = require('@chuva.io/less');
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    Import `files` from `less`.
    ```python showLineNumbers
    from less import files
    ```
  </TabItem>
  
</Tabs>

## Create a upload url

Let's create a url to enable us to upload our file

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js {30-33} showLineNumbers
    const axios = require('axios');
    const { files } = require('@chuva.io/less');

    async function generateAndUploadTextFile(url) {
      try {
        // Generate a text file content
        const fileContent = "This is a sample text content for the file.";

        // Create a buffer with the text content
        const buffer = Buffer.from(fileContent, 'utf-8');

        // Make a POST request to the given URL to upload the file
        const response = await axios.put(url, buffer);

        // Check if the upload was successful
        if (response.status === 200) {
            console.log("File uploaded successfully.");
        } else {
            console.error(`Error uploading file. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    }

    module.exports = async () => { 
      // Example usage.

      // Creating a url to upload my file, it expires in 2 hours
      const url = await files.create_upload_url(
        'my_files/document.txt',
        { 'expires_in': 7200 }
      );

      // Now use the function to generate the file
      // and upload it to the URL provided by file storage
      await generateAndUploadTextFile(url);
    }
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```python {24-27} showLineNumbers
    from less import files
    import requests

    def generate_and_upload_text_file(url):
      # Generate a text file content
      file_content = "This is a sample text content for the file."

      # Create a buffer with the text content
      buffer = bytes(file_content, 'utf-8')

      # Make a POST request to the given URL to upload the file
      response = requests.put(url, data=buffer)

      # Check if the upload was successful
      if response.status_code == 200:
          print("File uploaded successfully.")
      else:
          print(f"Error uploading file. Status code: {response.status_code}")


    # Example usage. 
    
    # Creating a url to upload my file, it expires in 2 hours
    url = files.create_upload_url(
      'my_files/document.txt',
      { 'expires_in': 7200 }
    )

    # Now use the function to generate the file
    # and upload it to the URL provided by file storage
    generate_and_upload_text_file(url)
    ```
  </TabItem>
  
</Tabs>

The **create_upload_url** method takes two arguments. The first one is the file path, such as `my_files/document.txt`. This indicates that the file `document.txt` will be stored in the my_files folder. The second argument is optional and is an object with one attribute, expires_in, allowing you to specify the expiration time in seconds for the URL. If not provided, the default expiration time is set to one hour.

## Get the url to display or download your file

Once your file is uploaded, you can conveniently access it by retrieving the URL associated with its **path** from the file storage.

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js {3} showLineNumbers
    const { files } = require('@chuva.io/less');

    const url = await files.get_url('my_files/document.txt');
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```python {3} showLineNumbers
    from less import files

    url = files.get_url('my_files/document.txt')
    ```
  </TabItem>
  
</Tabs>

The **get_url** method also takes two arguments and its arguments follows the same rules as the **create_upload_url** method.

## Public files

The preceding code for file uploads, as mentioned earlier, generates a presigned URL for the uploaded file. This presigned URL includes a signature, and removing it renders the file inaccessible for display or download. However, for files that do not require signatures for retrieval, making them public is achieved by storing them in a path beginning with `public/`

<Tabs groupId="programming-language" queryString="programming-language">
  
  <TabItem value="nodejs" label="Node.js">
    ```js {} showLineNumbers
    const axios = require('axios');
    const { files } = require('@chuva.io/less');

    module.exports = async () => { 
      // Creating a url to upload a public file
      const url = await files.create_upload_url(
        'public/my_files/document.txt',
        { 'expires_in': 7200 }
      );
    }
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```python {24-27} showLineNumbers
    from less import files
    import requests
    
    # Creating a url to upload a public file
    url = files.create_upload_url(
      'public/my_files/document.txt',
      { 'expires_in': 7200 }
    )

    ```
  </TabItem>
  
</Tabs>