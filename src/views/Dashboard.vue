<template>
  <div class="introduction">
    <h1 class="title">ColdBook</h1>
    <p class="description">Nơi chia sẻ kiến thức và trải nghiệm</p>
    <div class="buttons">
      <a
        href="https://coldbook2108.blogspot.com/2024/04/gioi-thieu-so-luoc-ve-coldbook.html"
        class="button"
        target="_blank"
      >
        <span class="button-text">Giới thiệu</span>
        <div class="button-hover"></div>
      </a>
      <a
        href="https://www.facebook.com/profile.php?id=100024557764749"
        class="button"
        target="_blank"
      >
        <span class="button-text">Liên hệ</span>
        <div class="button-hover"></div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Introduction'
}
</script>

<style scoped>
.introduction {
  text-align: center;
  padding: 50px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 3rem;
  font-weight: bold;
  color: #2c3e50; /* Màu chủ đạo */
  margin-bottom: 20px;
}

.description {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 30px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.button {
  display: inline-block;
  position: relative;
  overflow: hidden;
  margin: 0 10px;
  width: 200px; /* Độ rộng cố định */
}

.button-text {
  display: block;
  padding: 12px 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.1rem;
  text-decoration: none;
  color: #fff;
  background-color: #2c3e50; /* Màu chủ đạo */
  border-radius: 25px;
  transition: all 0.3s ease;
}

.button-hover {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 80%);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.3s ease;
}

.button:hover .button-hover {
  transform: translate(-50%, -50%) scale(1);
}
</style>
