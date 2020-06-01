import * as forms from './forms'

const appRouter = (app) => {
    const baseUrl = '/api';
    app.use(baseUrl, forms.routes);
};

export default appRouter;
