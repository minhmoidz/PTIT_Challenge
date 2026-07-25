import readline from 'readline';
import { AuthService } from '../server/services/authService';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('==================================================');
console.log('PICC 2026 — Secure Admin User Creation CLI');
console.log('==================================================\n');

rl.question('Email đăng nhập Admin (e.g. btc@ptit.edu.vn): ', (email) => {
  if (!email || !email.includes('@')) {
    console.error('❌ Email không hợp lệ.');
    rl.close();
    process.exit(1);
  }

  rl.question('Tên hiển thị (e.g. Quản trị viên BTC): ', (displayName) => {
    rl.question('Mật khẩu quản trị viên: ', async (password) => {
      if (!password || password.length < 8) {
        console.error('❌ Mật khẩu phải có tối thiểu 8 ký tự.');
        rl.close();
        process.exit(1);
      }

      try {
        const admin = await AuthService.createAdminUser(email, displayName || 'Admin', password, 'SUPER_ADMIN');
        console.log('\n✅ Tạo tài khoản SUPER_ADMIN thành công!');
        console.log(`- Email: ${admin.email}`);
        console.log(`- Vai trò: ${admin.role}`);
        console.log(`- ID: ${admin.id}`);
      } catch (err) {
        console.error('❌ Đã xảy ra lỗi:', err);
      } finally {
        rl.close();
      }
    });
  });
});
