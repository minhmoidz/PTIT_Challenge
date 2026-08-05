import readline from 'readline';
import { AuthService } from '../server/services/authService';
import { assertDatabaseReachable, prisma } from '../server/db/prisma';

/**
 * Created lazily rather than at import time: readline attaches to stdin
 * immediately, and with piped (non-TTY) input it would reach end-of-stream and
 * close while we are still awaiting the database check.
 */
let rl: readline.Interface | null = null;

const getRl = (): readline.Interface => {
  if (!rl) rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return rl;
};

const ask = (question: string): Promise<string> =>
  new Promise((resolve) => getRl().question(question, (answer) => resolve(answer.trim())));

/**
 * Reads a secret without echoing it.
 *
 * This suppresses readline's own echo rather than reading stdin directly:
 * readline stays attached to stdin for the whole session, so a second raw-mode
 * listener would race with it and the password would still be printed.
 */
interface MutableReadline {
  stdoutMuted?: boolean;
  output: NodeJS.WritableStream;
  _writeToOutput: (str: string) => void;
}

const askHidden = (question: string): Promise<string> =>
  new Promise((resolve) => {
    const iface = getRl();
    const target = iface as unknown as MutableReadline;

    target._writeToOutput = (str: string) => {
      if (target.stdoutMuted) return;
      target.output.write(str);
    };

    // Print the prompt before muting, then swallow every echoed keystroke.
    process.stdout.write(question);
    target.stdoutMuted = true;

    iface.question('', (answer) => {
      target.stdoutMuted = false;
      process.stdout.write('\n');
      resolve(answer.trim());
    });
  });

const fail = (message: string): never => {
  console.error(`\n❌ ${message}`);
  process.exit(1);
};

const main = async () => {
  console.log('==================================================');
  console.log('PICC 2026 — Secure Admin User Creation CLI');
  console.log('==================================================\n');

  await assertDatabaseReachable();

  const email = await ask('Email đăng nhập Admin (e.g. btc@ptit.edu.vn): ');
  if (!email.includes('@') || email.startsWith('@') || email.endsWith('@')) {
    fail('Email không hợp lệ.');
  }

  const displayName = await ask('Tên hiển thị (e.g. Quản trị viên BTC): ');

  const password = await askHidden('Mật khẩu (tối thiểu 12 ký tự, sẽ không hiển thị): ');
  if (password.length < 12) {
    fail('Mật khẩu phải có tối thiểu 12 ký tự.');
  }

  const confirm = await askHidden('Nhập lại mật khẩu: ');
  if (confirm !== password) {
    fail('Mật khẩu nhập lại không khớp.');
  }

  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  const admin = await AuthService.createAdminUser(
    email,
    displayName || 'Quản trị viên BTC',
    password,
    'SUPER_ADMIN',
  );

  console.log(
    `\n✅ ${existing ? 'Đã cập nhật mật khẩu cho' : 'Đã tạo'} tài khoản SUPER_ADMIN (lưu trong database).`,
  );
  console.log(`- Email:   ${admin.email}`);
  console.log(`- Vai trò: ${admin.role}`);
  console.log(`- ID:      ${admin.id}`);
  console.log('\nĐăng nhập tại: /admin\n');
};

main()
  .catch((err) => {
    console.error('\n❌ Đã xảy ra lỗi:', err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(async () => {
    rl?.close();
    await prisma.$disconnect();
  });
