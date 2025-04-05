import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Bienvenido a Adoptafácil
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Encuentra tu compañero perfecto para adoptar
        </p>
      </div>
    </Layout>
  );
}

export default App;