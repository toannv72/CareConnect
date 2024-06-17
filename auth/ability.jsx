import { Ability, AbilityBuilder } from "@casl/ability";
export const defineRulesFor = (user) => {
  const { can, rules } = new AbilityBuilder(Ability);

  switch (user.role) {
    case "nurse":
      can("manage", "all");
      break; // Quan trọng: thêm break để ngăn "fall-through"
    case "customer":
      can("read", "Profile");
      // ... thêm các quyền khác cho user ở đây
      break; // Quan trọng: thêm break để ngăn "fall-through"
    default:
      // Xử lý trường hợp không có role phù hợp (nếu cần)
      break;
  }

  return rules;
};


