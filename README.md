# AlertaJs

A minimalist toast notification system for React. Alerta provides a simple and elegant way to display toast notifications, ensuring users are informed of events and actions in your application.

## Features

- 🚀 Lightweight and easy to integrate
- 🎨 Supports different types of notifications: success, error, info, and warning
- ⚙️ Customizable options for each toast (title, duration, callbacks)
- ⏰ Automatic dismissal with optional visual timer
- 📱 Responsive design with mobile support
- 🎯 Simple API for adding and removing toasts
- 🔄 Expandable toasts for long messages
- 🎭 Smooth animations and hover interactions

## Installation

To install Alerta, you can use npm or yarn:

```bash
# With npm
npm install alertajs

# With yarn
yarn add alertajs
```

## Usage

### 1. Setup

Import the `ToastBox` component in your app component and specify the position for the toasts to be displayed:

```tsx
import { alerta, ToastBox } from "alertajs";
```

```tsx
// App.tsx
import React from 'react';
import { alerta, ToastBox } from "alertajs";

const App: React.FC = () => {
  return (
    <div>
      <h1>Your App</h1>
      {/* Other components */}
      <ToastBox position="top-right" />
    </div>
  );
};

export default App;
```

### 2. Using Alerta

You can use the Alerta methods in your components to show different types of notifications. Each method accepts a message and optional customization options:

```tsx
import React from 'react';
import { alerta, ToastBox } from "alertajs";

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

  const showInfoToast = () => {
    alerta.info('Here is some information.', {
      title: 'Info',
      duration: 4000,
    });
  };

  const showWarningToast = () => {
    alerta.warning('Please be careful.', {
      title: 'Warning',
      duration: 6000,
    });
  };

  return (
    <div>
      <button onClick={showSuccessToast}>Show Success Toast</button>
      <button onClick={showErrorToast}>Show Error Toast</button>
      <button onClick={showInfoToast}>Show Info Toast</button>
      <button onClick={showWarningToast}>Show Warning Toast</button>
    </div>
  );
};

export default SomeComponent;
```

### 3. ToastBox Configuration

The `ToastBox` component accepts the following props:

```tsx
<ToastBox 
  position="top-right" // "top-left" | "top-right" | "bottom-left" | "bottom-right"
  showTimer={true}     // Optional: Show visual timer (default: false)
/>
```

## API

### `alerta`

- **`success(message: string, options?: Partial<ToastOptions>)`**: Displays a success toast.
- **`error(message: string, options?: Partial<ToastOptions>)`**: Displays an error toast.
- **`info(message: string, options?: Partial<ToastOptions>)`**: Displays an informational toast.
- **`warning(message: string, options?: Partial<ToastOptions>)`**: Displays a warning toast.
- **`dismissAll()`**: Dismisses all active toasts.

### ToastOptions

```tsx
interface ToastOptions {
  title?: string;        // Optional title for the toast
  duration?: number;     // Duration in milliseconds (default: 5000)
  onClose?: () => void;  // Optional callback when toast is dismissed
}
```

## Customization

You can customize the appearance of your toasts by adding CSS styles. The library uses semantic class names for easy styling:

```css
.toast {
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin: 5px 0;
}

.toast.success {
  border-left-color: #28a745;
}

.toast.error {
  border-left-color: #dc3545;
}

.toast.info {
  border-left-color: #17a2b8;
}

.toast.warning {
  border-left-color: #ffc107;
}
```

## Browser Support

AlertaJs supports all modern browsers and React versions 16.8.0 and above.

## License

MIT License. See [LICENSE](https://github.com/B-uchi/alertajs/blob/master/LICENSE.txt) for details.

## Contributing

If you'd like to contribute to AlertaJs, feel free to fork the [repository](https://github.com/B-uchi/alertajs) and submit a pull request!
