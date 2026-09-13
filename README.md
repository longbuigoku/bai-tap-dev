# 01 - HTML ngữ nghĩa & Box / Layout
## Trang giới thiệu bản thân - Semantic HTML

### Khung HTML ngữ nghĩa

```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Giới thiệu bản thân - Bùi Đức Long</title>
  </head>

  <body>
    <header>
      <h1>Bùi Đức Long</h1>
      <p>Fullstack Developer</p>

      <nav aria-label="Điều hướng chính">
        <ul>
          <li><a href="#about">Giới thiệu</a></li>
          <li><a href="#skills">Kỹ năng</a></li>
          <li><a href="#projects">Dự án</a></li>
          <li><a href="#contact">Liên hệ</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="about">
        <h2>Giới thiệu</h2>
        <p>
          Tôi là một Fullstack Developer, yêu thích xây dựng các ứng dụng web và
          tìm hiểu về công nghệ backend.
        </p>
      </section>

      <section id="skills">
        <h2>Kỹ năng</h2>

        <ul>
          <li>ReactJS, NextJS, TypeScript</li>
          <li>NodeJS, NestJS, Express</li>
          <li>PostgreSQL, MongoDB</li>
          <li>Docker, Git, GitHub Actions</li>
        </ul>
      </section>

      <section id="projects">
        <h2>Dự án</h2>

        <article>
          <h3>Social CRM</h3>
          <p>
            Hệ thống quản lý hội thoại và tin nhắn từ nhiều nền tảng mạng xã
            hội.
          </p>
          <a href="#">Xem dự án</a>
        </article>

        <article>
          <h3>Low-code App Builder</h3>
          <p>Nền tảng xây dựng ứng dụng bằng giao diện kéo thả.</p>
          <a href="#">Xem dự án</a>
        </article>
      </section>

      <section id="contact">
        <h2>Liên hệ</h2>

        <address>
          Email:
          <a href="mailto:buiduclongit@email.com">buiduclongit@email.com</a
          ><br />
          GitHub:
          <a href="#">github.com/longbui2k3</a>
        </address>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Bùi Đức Long</p>
    </footer>
  </body>
</html>
```

### 5 thẻ semantic và khi nào dùng

| Thẻ         | Khi nào dùng                                                                                  |
| ----------- | --------------------------------------------------------------------------------------------- |
| `<header>`  | Phần đầu của trang hoặc một section/article, thường chứa logo, tiêu đề, navigation.           |
| `<nav>`     | Chứa các liên kết điều hướng chính của website.                                               |
| `<main>`    | Chứa nội dung chính duy nhất của trang. Một trang chỉ nên có một `<main>`.                    |
| `<section>` | Chia nội dung thành những khu vực có chủ đề riêng, thường có heading (`<h2>`, `<h3>`...).     |
| `<article>` | Dùng cho một nội dung độc lập, có thể tách riêng như bài viết, project, news card, blog post. |

### Một số thẻ semantic khác

- `<footer>` — phần cuối trang hoặc section.
- `<aside>` — nội dung phụ, sidebar, thông tin liên quan.
- `<address>` — thông tin liên hệ.
- `<figure>` + `<figcaption>` — hình ảnh/biểu đồ kèm chú thích.
- `<time>` — ngày hoặc thời gian.

### Nguyên tắc

Dùng `<div>` khi **không có thẻ semantic nào phù hợp**.

Không nên dùng `<div>` thay cho các thẻ có ý nghĩa như:

`<header>` → `<nav>` → `<main>` → `<section>` → `<article>` → `<footer>`

# 02 - Flexbox, Grid, Responsive & BEM

````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing Section</title>
  <style>
    .pricing {
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 24px;
      font-family: Arial, sans-serif;
    }

    .pricing__header {
      margin-bottom: 48px;
      text-align: center;
    }

    .pricing__title {
      margin: 0 0 12px;
      font-size: 2.5rem;
    }

    .pricing__description {
      margin: 0;
      color: #666;
    }

    .pricing__list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .pricing-card {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 32px;
      border: 1px solid #e5e5e5;
      border-radius: 16px;
      background: #fff;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease,
        border-color 0.3s ease;
    }

    .pricing-card:hover {
      transform: translateY(-8px);
      border-color: #ccc;
      box-shadow: 0 16px 32px rgb(0 0 0 / 12%);
    }

    .pricing-card--featured {
      border-color: #222;
    }

    .pricing-card__badge {
      position: absolute;
      top: 16px;
      right: 16px;
      padding: 6px 12px;
      border-radius: 999px;
      background: #222;
      color: #fff;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .pricing-card__name {
      margin: 0 0 24px;
      font-size: 1.5rem;
    }

    .pricing-card__price {
      display: flex;
      align-items: baseline;
      margin: 0 0 32px;
    }

    .pricing-card__currency {
      font-size: 1.25rem;
    }

    .pricing-card__amount {
      font-size: 3rem;
      font-weight: 700;
    }

    .pricing-card__period {
      color: #777;
    }

    .pricing-card__features {
      display: grid;
      gap: 12px;
      margin: 0 0 32px;
      padding: 0;
      list-style: none;
    }

    .pricing-card__feature::before {
      content: "✓";
      margin-right: 8px;
    }

    .pricing-card__button {
      margin-top: auto;
      padding: 12px 20px;
      border-radius: 8px;
      background: #222;
      color: #fff;
      text-align: center;
      text-decoration: none;
      transition:
        background-color 0.25s ease,
        transform 0.25s ease;
    }

    .pricing-card__button:hover {
      background: #444;
      transform: translateY(-2px);
    }

    @media (max-width: 900px) {
      .pricing__list {
        grid-template-columns: repeat(2, 1fr);
      }

      .pricing-card:last-child {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 600px) {
      .pricing {
        padding: 48px 16px;
      }

      .pricing__list {
        grid-template-columns: 1fr;
      }

      .pricing-card:last-child {
        grid-column: auto;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .pricing-card,
      .pricing-card__button {
        transition: none;
      }

      .pricing-card:hover,
      .pricing-card__button:hover {
        transform: none;
      }
    }
  </style>
</head>

<body>
  <main>
    <section class="pricing" aria-labelledby="pricing-title">
      <header class="pricing__header">
        <h1 class="pricing__title" id="pricing-title">Pricing Plans</h1>
        <p class="pricing__description">
          Choose the plan that works best for you.
        </p>
      </header>

      <div class="pricing__list">
        <article class="pricing-card">
          <h2 class="pricing-card__name">Basic</h2>

          <p class="pricing-card__price">
            <span class="pricing-card__currency">$</span>
            <span class="pricing-card__amount">9</span>
            <span class="pricing-card__period">/month</span>
          </p>

          <ul class="pricing-card__features">
            <li class="pricing-card__feature">5 Projects</li>
            <li class="pricing-card__feature">10 GB Storage</li>
            <li class="pricing-card__feature">Email Support</li>
          </ul>

          <a class="pricing-card__button" href="#">Get Started</a>
        </article>

        <article class="pricing-card pricing-card--featured">
          <span class="pricing-card__badge">Popular</span>

          <h2 class="pricing-card__name">Pro</h2>

          <p class="pricing-card__price">
            <span class="pricing-card__currency">$</span>
            <span class="pricing-card__amount">29</span>
            <span class="pricing-card__period">/month</span>
          </p>

          <ul class="pricing-card__features">
            <li class="pricing-card__feature">Unlimited Projects</li>
            <li class="pricing-card__feature">100 GB Storage</li>
            <li class="pricing-card__feature">Priority Support</li>
          </ul>

          <a class="pricing-card__button" href="#">Get Started</a>
        </article>

        <article class="pricing-card">
          <h2 class="pricing-card__name">Enterprise</h2>

          <p class="pricing-card__price">
            <span class="pricing-card__amount">Custom</span>
          </p>

          <ul class="pricing-card__features">
            <li class="pricing-card__feature">Unlimited Projects</li>
            <li class="pricing-card__feature">Unlimited Storage</li>
            <li class="pricing-card__feature">24/7 Support</li>
          </ul>

          <a class="pricing-card__button" href="#">Contact Us</a>
        </article>
      </div>
    </section>
  </main>
</body>
</html>

````