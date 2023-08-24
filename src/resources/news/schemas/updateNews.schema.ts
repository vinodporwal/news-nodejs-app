import * as yup from "yup";

export default yup.object({
  body: yup.object({
    _id: yup.string().required(),
    title: yup.string().optional(),
    content: yup.string().optional(),
    author: yup.string().optional(),
    publicationDate: yup.string().optional(),
    category: yup.string().optional(),
    source: yup.string().optional(),
    url: yup.string().optional(),
    imageUrl: yup.string().optional(),
    tags: yup.array().optional(),
    views: yup.number().optional(),
  }),
});
