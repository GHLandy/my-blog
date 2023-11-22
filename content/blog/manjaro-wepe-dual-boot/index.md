---
title: 关于 Manjaro 与 WEPE 的双启动 U 盘
date: '2023-11-22T06:20:15.844Z'
description: 本文记录关于 Manjaro 与 WEPE 作为双启动 U 盘的相关备忘
---

## 下载并解压得到文件

- 下载 Manjaro Plasma Desktop ISO 镜像文件 [https://manjaro.org/download/](https://manjaro.org/download/)

  解压出来文件，主要需要里边的 boot 目录，以及 manjaro 目录

- 下载 WEPE exe 文件 [https://www.wepe.com.cn/download.html](https://www.wepe.com.cn/download.html)

  通过 WEPE ext 文件生成 ISO 镜像，然后把 ISO 镜像解压出来文件，需要里边的 EFI 目录，以及 WEPE 目录

## U 盘 (或移动硬盘) 准备

使用 `gdisk` 命令为 U 盘新建 GPT 分区表，并新建分区、格式化

- EFI 分区: 384M，格式化为 FAT32，label 设置为 EFIBOOT，主要用于放置 boot 目录，以及 WEPE 目录

- EXT4 分区：3584M，格式化为 EXT4，label 设置为 MANAJRO_KDEM，主要用户防止 manjaro 目录

- 剩余空间，为方便 Windows、Linux 下使用，可格式化为 exFat 或 ntfs

## 把 manjaro 目录复制到 EXT4 分区

```bash
mount /dev/sda2 /mnt
cp -r /path/to/manjaro /mnt/
umount /mnt
```

## 安装 grub 到 EFI 分区

```bash
mount /dev/sda1 /mnt
grub-install --target=x86_64-efi --removable --boot-directory=/mnt/boot --efi-directory=/mnt
# 执行完之后，EFI 分区会有一个 boot 目录和 EFI 目录，直接把不需要 boot 目录备份一下或删除掉
mv /mnt/boot /mnt/boot-bak
```

## 把 boot 目录复制到 EFI 分区，并修改 kernels.cfg

```bash
cp -r /path/to/boot /mnt/
vim /mnt/boot/grub/kernels.cfg
# 搜索 misolabel=MANJARO_KDEM_xxxx 并改为 misolabel=MANJARO_KDEM (即 EXT4 的 label)
# 至此，Manjaro 已设置好
```

## 把 WEPE 目录复制到 EFI 分区

```bash
cp -r /path/to/WEPE /mnt/
```

## 复制 WEPE 的 EFI 及新建 wepe.cfg

```bash
cp -r /path/to/EFI/MICROSOFT /mnt/EFI/
cp -r /path/to/EFI/BOOT/bootx64.efi /mnt/EFI/MICROSOFT/
```

新建 `/mnt/boot/grub/wepe.cfg`，此处的 label 设置未先前 EFI 的 EFIBOOT

```
menuentry "Windows 10 PE (x86_64, UEFI)" --class=windows "Windows" {
    insmod chain
    search --no-floppy --set=root --label EFIBOOT
    chainloader /EFI/MICROSOFT/bootx64.efi
}
```

将 `wepe.cfg` 应用到 `grub.cfg`

```bash
vim /mnt/boot/grub/grub.cfg
# 在 source /boot/grub/kernels.cfg 下方添加 source /boot/grub/wepe.cfg
```

最后 `umount /mnt`
