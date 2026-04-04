import type {CreateCustomerInput, UpdateCustomerInput} from "~/schemas/customer.validation";

export const useCustomers = () => {
  const api = useApi()

  const createCustomer = async (data: CreateCustomerInput) => {
    try {
      return await api('/customers', {
        method: 'POST',
        body: data
      })
    } catch (err) {
      throw err
    }
  }

  const getCustomers = async () => {
    try {
      return await api('/customers', {
        method: 'GET'
      })
    } catch (err) {
      throw err
    }
  }

  const getCustomer = async (id: number) => {
    try {
      return await api(`/customers/${id}`, {
        method: 'GET'
      })
    } catch (err) {
      throw err
    }
  }

  const updateCustomer = async (data: UpdateCustomerInput, id: number) => {
    try {
      return await api(`/customers/${id}`, {
        method: 'PATCH',
        body: data
      })
    } catch (err) {
      throw err
    }
  }

  const deleteCustomer = async (id: number) => {
    try {
      return await api(`/customers/${id}`, {
        method: 'DELETE'
      })
    } catch (err) {
      throw err
    }
  }

  return { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer }
}

