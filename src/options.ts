import fs from 'fs';
import { askQuestion, execCommand } from './utils/helpers';


const runOptions = async (): Promise<void> => {

  // Perguntar sobre i18n
  const installI18n = await askQuestion("Deseja instalar i18n? (y/n): ");
  if (installI18n.toLowerCase() === "y") {
    console.log("📦 Instalando i18n...");
    execCommand("npm install i18next react-i18next ");

    console.log("📂 Criando arquivo i18n.ts...");

    //i18n.ts
    fs.writeFileSync("src/i18n.ts", `
      import i18n from 'i18next'
      import { initReactI18next } from 'react-i18next'

      i18n.use(initReactI18next).init({
      resources: {
        en: {
          translation: {
            home: 'Home',
            tasks: 'Tasks',
            editing: 'Editing...',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            save: 'Save',
            cancel: 'Cancel',
            editContact: 'Edit contact',
            editTask: 'Edit task',
            remove: 'Remove',
            login: 'Login',
            logout: 'Logout',
            password: 'Password',
            enter: 'Enter',
            hide: 'Hide',
            show: 'Show',
            hidePassword: 'Hide password',
            showPassword: 'Show password',
            calendar: 'Calendar',
            contacts: 'Contacts',
            products: 'Products',
            profile: 'Profile',
            requests: 'Requests',
            newContact: 'New Contact',
            newTask: 'New Task',
            addToCart: 'Add to Cart',
            pending: 'Pending',
            completed: 'Completed',
            urgent: 'Urgent',
            important: 'Important',
            normal: 'Normal',
            friend: 'Friend',
            known: 'Known',
            unknown: 'Unknown',
            search: 'Search',
            return: 'Return',
            all: 'All',
            markedAs: 'marked as',
            task: 'Task',
            contact: 'Contact',
            description: 'Description',
            fullName: 'Full Name',
            contactMarkedAsAll: 'contact(s) marked as: All',
            contactMarketAs: 'contact(s) marked as:',
            taskMarkedAsAll: 'task(s) marked as: All',
            taskMarketAs: 'task(s) marked as:',
            title: 'Title',
            fillAllFilds: 'Please fill in all required fields.',
            test: 'Test',
            click: 'Click Here',
            cart: 'Cart',
            cartEmpty: 'Your cart is empty',
            cartTotal: 'Total'
          }
        },
        pt: {
          translation: {
            home: 'Início',
            tasks: 'Tarefas',
            editing: 'Editando...',
            name: 'Nome',
            email: 'Email',
            phone: 'Telefone',
            save: 'Salvar',
            cancel: 'Cancelar',
            editContact: 'Editar contato',
            editTask: 'Editar tarefa',
            remove: 'Remover',
            login: 'Conectar',
            logout: 'Desconectar',
            password: 'Senha',
            enter: 'Entrar',
            hide: 'Ocultar',
            show: 'Mostrar',
            hidePassword: 'Ocultar senha',
            showPassword: 'Mostrar senha',
            calendar: 'Calendário',
            contacts: 'Contatos',
            products: 'Produtos',
            profile: 'Perfil',
            requests: 'Solicitações',
            newContact: 'Novo Contato',
            newTask: 'Nova Tarefa',
            addToCart: 'Adicionar ao Carrinho',
            pending: 'Pendente',
            completed: 'Concluído',
            urgent: 'Urgente',
            important: 'Importante',
            normal: 'Normal',
            friend: 'Amigo',
            known: 'Conhecido',
            unknown: 'Desconhecido',
            search: 'Pesquisar',
            return: 'Voltar',
            all: 'Todos(as)',
            markedAs: 'marcado como',
            task: 'Tarefa',
            contact: 'Contato',
            description: 'Descrição',
            fullName: 'Nome Completo',
            contactMarkedAsAll: 'contato(s) marcado(s) como: Todos',
            contactMarketAs: 'contato(s) marcado(s) como:',
            taskMarkedAsAll: 'tarefa(s) marcada(s) como: Todas',
            taskMarketAs: 'tarefa(s) marcada(s) como:',
            title: 'Título',
            fillAllFilds: 'Por favor, preencha Todos os campos obrigatórios.',
            test: 'Teste',
            click: 'Clique Aqui',
            cart: 'Carrinho',
            cartEmpty: 'Seu carrinho está vazio',
            cartTotal: 'Total'
          }
        }
      },
      lng: 'pt',
      fallbackLng: 'pt',
      interpolation: {
        escapeValue: false
      }
    })

      export default i18n
    `)

    // Criar languageSlice.ts
    fs.mkdirSync("src/redux/slice", { recursive: true });
    fs.writeFileSync("src/redux/slice/languageSlice.ts", `
      import { createSlice, PayloadAction } from '@reduxjs/toolkit'

    interface LanguageState {
      language: 'pt' | 'en'
    }

    const initialState: LanguageState = {
      language: 'en'
    }

    const languageSlice = createSlice({
      name: 'language',
      initialState,
      reducers: {
        toggleLanguage: (state, action: PayloadAction<'pt' | 'en'>) => {
          state.language = action.payload
        }
      }
    })

    export const { toggleLanguage } = languageSlice.actions
    export default languageSlice.reducer
    `);
  }

  // Perguntar sobre área de testes
  const installOtherDeps = await askQuestion("Deseja instalar a área de testes? (ex: Jest, Cypress, etc)? (y/n)");
  if (installOtherDeps.toLowerCase() === "y") {
    console.log("📦 Instalando dependências de teste...");
    execCommand("npm install jest ts-jest @testing-library/react jest-environment-jsdom cypress mochawesome");

    console.log("📂 Criando pastas de testes e utils...");
    execCommand("mkdir src/__tests__ src/utils/tests");

    console.log("📄 Criando arquivos de configuração e preloader para Jest...");

    //setupTests.ts
    fs.writeFileSync("setupTests.ts", `
      import '@testing-library/jest-dom'
      import { TextEncoder } from 'util'

      global.TextEncoder = TextEncoder
    `);

    // Jest config.ts
    fs.writeFileSync("jest.config.ts", `
      export default {
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.tsx?$': 'ts-jest'
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      setupFilesAfterEnv: ['<rootDir>/setupTests.ts']
      }
    `);

    //preloader.tsx
    fs.writeFileSync("src/utils/tests/preloader.tsx", `
      import { render, RenderOptions } from '@testing-library/react'
      import React, { JSX, PropsWithChildren } from 'react'
      import { Provider } from 'react-redux'
      import { AppStore, configureStore, RootState } from '../../redux/store'

      interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
      preloadedState?: Partial<RootState>
      store?: AppStore
      }

      export function providerRender(element: React.ReactElement, { preloadedState = {}, store = configureStore(preloadedState), ...additionalOptions }: ExtendedRenderOptions = {}) {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
      }

      return {
        store,
        ...render(element, {
          wrapper: Wrapper,
          ...additionalOptions
        })
      }
    }
    `);

    fs.writeFileSync("src/__tests__/test.test.tsx", `
      
    `);
  }

  // Aplicando ESLint e Prettier
  console.log("✅ ESLint e Prettier aplicados!");
  console.log("✅ Projeto configurado com sucesso!");
};

export default runOptions;
