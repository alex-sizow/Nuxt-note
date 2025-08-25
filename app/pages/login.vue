<template>
  <div>
    <article>
      <h1>Sign up for a free account</h1>
      <p>Already have an account? <a href="/sign">Log in</a></p>
    </article>
    <form>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>