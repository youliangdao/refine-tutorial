import { Refine } from "@refinedev/core";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
  useNotificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  ErrorComponent,
} from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { BlogPostList } from "./pages/blog-posts/list";
import { BlogPostEdit } from "./pages/blog-posts/edit";
import { BlogPostShow } from "./pages/blog-posts/show";
import { BlogPostCreate } from "./pages/blog-posts/create";

const App = () => {
  return (
    <MantineProvider
      theme={RefineThemes.Blue}
      withNormalizeCSS
      withGlobalStyles
    >
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <BrowserRouter>
          <Refine
            routerProvider={routerBindings}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "blog_posts",
                list: "/blog-posts",
                show: "/blog-posts/show/:id",
                create: "/blog-posts/create",
                edit: "/blog-posts/edit/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="blog_posts" />}
                />
                <Route path="blog-posts">
                  <Route index element={<BlogPostList />} />
                  <Route path="show/:id" element={<BlogPostShow />} />
                  <Route path="edit/:id" element={<BlogPostEdit />} />
                  <Route path="create" element={<BlogPostCreate />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
          </Refine>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
