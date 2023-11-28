---
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Cross Language Functions

Less facilitates the utilization of a function created in one programming language in another. This implies that you can use a Python function in JavaScript and vice versa.
In order to create a cross language function, you will need to create a folder named `functions` in the less directory

```bash
mkdir -p less/functions
```

You can have multiple functions, for example I want to create a function that sum two numbers.
```bash
mkdir less/functions/sum
```

<Tabs>
  
  <TabItem value="nodejs" label="Node.js">
    ```bash
    touch less/functions/sum/index.js
    ```
    
    ```js title="less/functions/sum/index.js" showLineNumbers
    exports.process = (data) => {
      return data.first_number + data.second_number;
    }
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    ```bash
    touch less/functions/sum/__init__.py
    ```

    ```py title="less/functions/sum/__init__.py" showLineNumbers
    def process(data):
      return data.get('first_number') + data.get('second_number')
    ```
  </TabItem>
  
</Tabs>

### Calling your cross language function

<Tabs>
  
  <TabItem value="nodejs" label="Node.js">
    Import `functions` from `@chuva.io/less` to call the function and process your payload in order to retrieve the response.

    ```js showLineNumbers
    const { functions } = require('@chuva.io/less');
    ```

    Now you can call your Python function on Javascript

    Let's sum two numbers
    ```js showLineNumbers
    const { functions } = require('@chuva.io/less');

    const sum_result = await functions.sum({ first_number: 3, second_number: 4 });

    console.log('The sum result: ', sum_result);
    // The sum result: 7
    ```
  </TabItem>

  <TabItem value="py" label="Python">
    Import `functions` from `less` to call the function and process your payload in order to retrieve the response.
    
    ```py showLineNumbers
    from less import functions
    ```

    Now you can call your Javascript function on Python

    Let's sum two numbers

    ```py showLineNumbers
    from less import functions

    sum_result = functions.sum({ 'first_number': 3, 'second_number': 4 })

    print('The sum result:', sum_result)
    # The sum result: 7
    ```
  </TabItem>
  
</Tabs>

:::tip Tip
To enable a function from your [Shared Code](/shared-code) to be accessible across different programming languages, you can achieve this by creating a cross-language function in the `functions` directory. Inside this cross-language function, import the desired function from your Shared Code and include it in the process function.
:::
