import { test, expect } from '@playwright/test';

test.describe('Book List Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000'); // Đảm bảo URL trỏ đến trang chứa danh sách sách
    });

    test('Hiển thị danh sách sách nếu có dữ liệu', async ({ page }) => {
        // Giả lập dữ liệu store nếu cần (mock API hoặc state)
        await expect(page.locator('.card-item')).toHaveCount(5); // Kiểm tra nếu có 5 sách chẳng hạn
    });

    test('Hiển thị nút Get book nếu không có dữ liệu', async ({ page }) => {
        // Kiểm tra nút hiển thị khi chưa có sách
        await expect(page.locator('text=Get book')).toBeVisible();
    });

    test('Nhấp vào Get book và tải danh sách sách', async ({ page }) => {
        const getBookButton = page.locator('text=Get book');
        await getBookButton.click();
        
        // Giả lập API phản hồi
        await page.waitForResponse(response => response.url().includes('/api/books') && response.status() === 200);
        
        // Kiểm tra danh sách đã tải
        await expect(page.locator('.card-item')).toHaveCount(5);
    });

    test('Kiểm tra thông tin từng sách', async ({ page }) => {
        const firstBook = page.locator('.card-item').first();
        await expect(firstBook.locator('.card-title')).not.toBeEmpty();
        await expect(firstBook.locator('.card-description')).not.toBeEmpty();
        await expect(firstBook.locator('.price')).not.toBeEmpty();
    });

    test('Hình ảnh mặc định nếu không có ảnh sách', async ({ page }) => {
        const firstBookImage = page.locator('.card-item img').first();
        await expect(firstBookImage).toHaveAttribute('src', /freepik\.com/);
    });
});
