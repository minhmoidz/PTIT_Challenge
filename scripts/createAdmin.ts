import readline from 'readline';
import { AuthService } from '../server/services/authService';
import { assertDatabaseReachable, prisma } from '../server/db/prisma';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question: string): Promise<string> =>
  new Promise((resolve) => rl.question(question, (answer) => resolve(answer.trim())));

/** Reads a secret without echoing it to the terminal. */
const askHidden = (question: string): Promise<string> =>
  new Promise((resolve) => {
    const input = process.stdin;
    const wasRaw = input.isRaw ?? false;
    process.stdout.write(question);

    let value = '';
    const onData = (chunk: Buffer) => {
      const char = chunk.toString('utf8');
      if (char === '\n' || char === '\r' || char === '\u0004') {
        input.removeListener('data', onData);
        if (input.isTTY) input.setRawMode(wasRaw);
        process.stdout.write('\n');
        resolve(value.trim());
        return;
      }
      if (char === '\u0003') {
        process.stdout.write('\n');
        process.exit(1);
      }
      if (char === '\u007f' || char === '\b') {
        value = value.slice(0, -1);
        return;
      }
      value += char;
    };

    if (input.isTTY) input.setRawMode(true);
    input.resume();
    input.on('data', onData);
  });

const main = async () => {
  console.log('==================================================');
  console.log('PICC 2026 — Secure Admin User Creation CLI');
  console.log('==================================================\n');

  await assertDatabaseReachable();

  const email = await ask('Email đăng nhập Admin (e.g. btc@ptit.edu.vn): ');
  if (!email || !email.includes('@')) {
    console.error('❌ Email không hợp lệ.');
    process.exit(1);
  }

  const displayName = await ask('Tên hiển thị (e.g. Quản trị viên BTC): ');

  const password = await askHidden('Mật khẩu quản trị viên (tối thiểu 12 ký tự, không hiển thị): ');
  if (password.length < 12) {
    console.error('❌ Mật khẩu phải có tối thiểu 12 ký tự.');
    process.exit(1);
  }

  const confirm = await askHidden('Nhập lại mật khẩu: ');
  if (confirm !== password) {
    console.error('❌ Mật khẩu nhập lại không khớp.');
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  const admin = await AuthService.createAdminUser(
    email,
    displayName || 'Quản trị viên BTC',
    password,
    'SUPER_ADMIN',
  );

  console.log(`\n✅ ${existing ? 'Cập nhật' : 'Tạo'} tài khoản SUPER_ADMIN thành công (đã lưu vào database).`);
  console.log(`- Email: ${admin.email}`);
  console.log(`- Vai trò: ${admin.role}`);
  console.log(`- ID: ${admin.id}`);
};

main()
  .catch((err) => {
    console.error('\n❌ Đã xảy ra lỗi:', err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(async () => {
    rl.close();
    await prisma.$disconnect();
  });
