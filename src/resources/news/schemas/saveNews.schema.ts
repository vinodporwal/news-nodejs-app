import * as yup from "yup";

export default yup.object({
  body: yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
    author: yup.string().required(),
    publicationDate: yup.string().required(),
    category: yup.string().required(),
    source: yup.string().required(),
    url: yup.string().required(),
    imageUrl: yup.string().required(),
    tags: yup.array().required(),
    views: yup.number().required(),
  }),
});
