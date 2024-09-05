<!-- AccountCard.vue -->
<template>
  <div class="account-card">
    <div class="account-card-section">
      <div class="account-card-box">
        <h2 class="account-card-title">Profile</h2>
        <form method="get" class="account-card-form">
          <div class="account-card-form-group">
            <div class="account-card-input-group">
              <div class="account-card-input-box">
                <label class="account-card-label">First Name</label>
                <div class="account-card-input-wrap">
                  <input
                    required
                    name="firstName"
                    type="text"
                    class="account-card-input"
                    value="Attidmese"
                  />
                </div>
              </div>
              <div class="account-card-input-box">
                <label class="account-card-label">Last Name</label>
                <div class="account-card-input-wrap">
                  <input
                    required
                    name="lastName"
                    type="text"
                    class="account-card-input"
                    value="BUNSUA"
                  />
                </div>
              </div>
            </div>
            <div class="account-card-email-group">
              <label class="account-card-email-label">Email</label>
              <div class="account-card-email-wrap">
                <p class="account-card-email-text">attidmese.bunsua@gmail.com</p>
                <button type="button" class="account-card-email-btn">Update</button>
              </div>
            </div>
            <div class="account-card-password-group">
              <label class="account-card-password-label">Update Password</label>
              <p class="account-card-password-desc">
                To update your password, provide the desired password in the
                fields below. Otherwise, leave the fields blank to keep your
                existing password.
              </p>
            </div>
            <div class="account-card-password-input-group">
              <div class="account-card-input-box">
                <label class="account-card-label">Password</label>
                <div class="account-card-input-wrap">
                  <input
                    name="password"
                    type="password"
                    class="account-card-input"
                    value=""
                  />
                </div>
                <p class="account-card-input-hint">6-20 characters</p>
              </div>
              <div class="account-card-input-box">
                <label class="account-card-label">Verify Password</label>
                <div class="account-card-input-wrap">
                  <input
                    name="password2"
                    type="password"
                    class="account-card-input"
                    value=""
                  />
                  <div class="account-card-icon-wrap">
                    <!-- Icon here -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-card {
  background: #FFFFFF;
  border: 1px solid #EAEAEA;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 24px;
  max-width: 600px; /* Set a max-width for the entire card */
  margin: auto; /* Center the card in the parent element */
}

.account-card-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
}

.account-card-form {
  display: flex;
  flex-direction: column;
}

.account-card-form-group {
  margin-bottom: 24px;
}

.account-card-input-group {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.account-card-input-box {
  flex-grow: 1;
  flex-basis: calc(50% - 8px); /* Adjust the basis to control the initial size */
}

.account-card-label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.account-card-input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 16px;
  color: #4B5563;
}

.account-card-email-group,
.account-card-password-group {
  margin-bottom: 24px;
}

.account-card-email-label,
.account-card-password-label {
  font-weight: bold;
  margin-bottom: 8px;
}

.account-card-email-text {
  margin-right: 16px;
  font-size: 16px;
  color: #6B7280;
}

.account-card-email-btn {
  padding: 8px 16px;
  background-color: #10B981;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.account-card-password-desc {
  font-size: 14px;
  color: #6B7280;
}

.account-card-password-input-group {
  display: flex;
  flex-direction: row;
}

.account-card-input-hint {
  font-size: 14px;
  color: #9CA3AF;
}

.account-card-icon-wrap {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.account-card-icon {
  fill: currentColor;
  width: 20px;
  height: 20px;
}
</style>