export class AppUtils {
    public static async sleep (timeout: number) : Promise<void> {
        return new Promise<void>((resolve) => setTimeout(resolve, timeout));
    }
}
