import api from "@/lib/api"

function toFormData(data: Record<string, any>, prefix = "") {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    const formKey = prefix ? `${prefix}[${key}]` : key

    if (value instanceof File) {
      formData.append(formKey, value)
    } else if (value instanceof FileList) {
      if (value.length > 0) {
        formData.append(formKey, value[0])
      }
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        formData.append(`${formKey}[${i}]`, v)
      })
    } else if (value !== null && typeof value === "object") {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        formData.append(`${formKey}[${nestedKey}]`, nestedValue as any)
      })
    } else if (value !== undefined) {
      formData.append(formKey, value)
    }
  })

  return formData
}

export function useApi() {
  const post = async (
    url: string,
    data: Record<string, any>,
    options?: { type?: "json" | "formData"; prefix?: string }
  ) => {
    const { type = "json", prefix = "" } = options || {}

    if (type === "formData") {
      const formData = toFormData(data, prefix)
      const res = await api.post(url, formData)
      return res.data
    } else {
      const res = await api.post(url, data)
      return res.data
    }
  }

  const put = async (
    url: string,
    data: Record<string, any>,
    options?: { type?: "json" | "formData"; prefix?: string }
  ) => {
    const { type = "json", prefix = "" } = options || {}

    if (type === "formData") {
      const formData = toFormData(data, prefix)
      const res = await api.put(url, formData)
      return res.data
    } else {
      const res = await api.put(url, data)
      return res.data
    }
  }

  const get = async (url: string, params?: Record<string, any>) => {
    const res = await api.get(url, { params })
    return res.data
  }

  const del = async (url: string) => {
    const res = await api.delete(url)
    return res.data
  }

  return {
    get,
    post,
    put,
    delete: del,
  }
}
