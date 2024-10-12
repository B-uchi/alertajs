# AlertaJs

A minimalist toast notification system for React. Alerta provides a simple and elegant way to display toast notifications, ensuring users are informed of events and actions in your application.

## Features

- Lightweight and easy to integrate
- Supports different types of notifications: success, error, info, and warning
- Customizable options for each toast
- Automatic dismissal of toasts
- Simple API for adding and removing toasts

## Installation

To install Alerta, you can use npm or yarn:

- With npm: `npm install alertajs`
- With yarn: `yarn add alertajs`

## Usage

### 1. Setup

Import the `ToastBox` component in your app component and specify the position for the toasts to be displayed

```
import {alerta, ToastBox} from "alertajs"
```

then

```
// App.tsx
import React from 'react';
import {alerta, ToastBox} from "alertajs"

const App: React.FC = () => {
  return (
    <div>
      <h1>Your App</h1>
      {/* Other components */}
      <ToastBox position="top-left | top-right | bottom-left | bottom-right" />
    </div>
  );
};

export default App;
```

### 2. Using Alerta

You can use the Alerta methods in your components to show different types of notifications such as success, error, info, and warning. Each method accepts a message and optional customization options.

```
import React from 'react';
import {alerta, ToastBox} from "alertajs"

const SomeComponent: React.FC = () => {
  const showSuccessToast = () => {
    alerta.success('Operation completed successfully!', {
      title: 'Success',
      duration: 3000,
    });
  };

  const showErrorToast = () => {
    alerta.error('Something went wrong.', {
      title: 'Error',
      duration: 5000,
    });
  };

  return (
    <div>
      <button onClick={showSuccessToast}>Show Success Toast</button>
      <button onClick={showErrorToast}>Show Error Toast</button>
    </div>
  );
};

export default SomeComponent;

```

## API

### `alerta`

- **`success(message: string, options?: Partial<ToastOptions>)`**: Displays a success toast.
- **`error(message: string, options?: Partial<ToastOptions>)`**: Displays an error toast.
- **`info(message: string, options?: Partial<ToastOptions>)`**: Displays an informational toast.
- **`warning(message: string, options?: Partial<ToastOptions>)`**: Displays a warning toast.
- **`dismissAll()`**: Dismisses all active toasts.

## Customization

You can customize the appearance of your toasts by adding CSS styles. Modify the styles to suit your application’s design.

```
.toast {
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin: 5px 0;
}

.toast.success {
  border-color: green;
}

.toast.error {
  border-color: red;
}

.toast.info {
  border-color: blue;
}

.toast.warning {
  border-color: orange;
}
```

## License

MIT License. See [LICENSE](https://github.com/B-uchi/alertajs/blob/master/LICENSE.txt) for details.

## Contributing

If you'd like to contribute to AlertaJs, feel free to fork the [repository](https://github.com/B-uchi/alertajs) and submit a pull request!
