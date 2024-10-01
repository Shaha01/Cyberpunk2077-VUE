<script>

</script>


<template>
  <div class="sell">
    <img src="@/assets/images/main/sell-line.svg" alt="svg" class="sell-line">
    <div class="sell-content container">
      <div class="sell-content__title">
        <img src="@/assets/images/main/sell%20icon.svg" alt="svg" class="sell-content-icon">

        <h2 class="sell-content__title-title">
          Играй и выигрывай!
        </h2>
      </div>

      <p class="sell-content__text">
        Играй в <span class="sell-content__text-span">Cyberpunk 2077</span> и получи возможность выиграть консоль
        Xbox Series X или Sony PlayStation
        5! Заполни
        форму ниже и приложи скриншот о покупке игры. Итоги розыгрыша будут подведены 1 февраля. Удачи! ;)
      </p>

      <div class="sell-content__box">
        <div class="sell-content__box-reg">
          <form class="sell-content__box-reg__inputs">

            <input type="text" placeholder="Как тебя зовут?" class="sell-content__box-reg__inputs-input">
            <input type="email" placeholder="Твой e-mail" class="sell-content__box-reg__inputs-input">

            <label class="sell-content__box-reg__inputs-file">
              Прикрепить скриншот
              .png / .jpg / .pdf
              <input type="file" accept=".jpg, .jpeg, .png, .pdf">
            </label>

            <label class="sell-content__box-reg__inputs-btn">
              Отправить
              <input type="button">
            </label>

            <label class="sell-content__box-reg__inputs-checkbox">
              <input type="checkbox">
              Согласен на обработку персональных данных
            </label>

          </form>

        </div>

        <img src="@/assets/images/main/game-konsol.svg" alt="svg" class="sell-content__box-images">

      </div>

    </div>
  </div>
</template>
