CREATE TABLE `page_views` (
  `id` integer PRIMARY KEY AUTOINCREMENT,
  `created_at` text NOT NULL,
  `user_agent` text,
  `referer` text
);

CREATE TABLE `test_completions` (
  `id` integer PRIMARY KEY AUTOINCREMENT,
  `created_at` text NOT NULL,
  `primary_bean` text NOT NULL,
  `secondary_bean` text NOT NULL
);

CREATE TABLE `share_clicks` (
  `id` integer PRIMARY KEY AUTOINCREMENT,
  `created_at` text NOT NULL,
  `action` text NOT NULL,
  `primary_bean` text NOT NULL
);

CREATE TABLE `bean_distribution` (
  `bean_code` text PRIMARY KEY,
  `count` integer NOT NULL DEFAULT 0,
  `updated_at` text NOT NULL
);
