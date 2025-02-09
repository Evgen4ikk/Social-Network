import { eslint } from "@siberiacancode/eslint";

export default eslint({
  typescript: true,
  rules: {
    "eslint-comments/no-unlimited-disable": "off",
  },
});
