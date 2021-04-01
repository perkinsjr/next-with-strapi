import { STRAPI_JWT } from "react-tinacms-strapi";
const previewHandler = (req, res) => {
  const previewData = {
    strapi_jwt: req.cookies[STRAPI_JWT],
  };

  res.setPreviewData(previewData);
  res.status(200).end();
};

export default previewHandler;
