"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={
              post.creator.image ||
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHoAmAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQYHBQQCA//EADgQAAEDAwEEBwQJBQAAAAAAAAABAgMEBREGBxITITFBUWFxgZEUFRYiMldigpKTscHRFyMkM3T/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABzrxfrTZIklu1wpqRi9HGkRqu8E6VKv8A1c0PxuF7655xvezS7vrugXkHNtF+tN7hWW03Cmq2J9LgyI5W+KdKHRRcgSAAAAAAAAAAAAAAAAAABRNpWuJdOtp7TZIfa7/X4SmgRN7cRVxvqnqiJ3L2F6UyTZlC3U+vNRatrESRKedaWizzSNvNMp93H4lA9enNk8E8vvbXNTLeLrL8z45JF4cf2ftdPh2IXD4I0pweH8OWrd/5GZ9cZLCAMt1Hsmghl966HqZrPdIvmYyOReHJ17v2ejw7UOvs11vLqBlRab3ElJqCg+WpgVMcREXG+ifr4p2oXsyPabCmmNd6c1bRokaTzpSVuOSPbyTK/dz+FANcToBCckJAAAAAAAAAAAAAAAAAh3NMGU7A1SlotQ2qRf8AIpbk5Xt68KiNz6sU1ZTH9WNqtnev26sp4nyWS6YjuLI253H9vrhyd+U6wNhB5LXcaS60MVdb6hk9NM3eZIxcop6wBlG3xW1VFp21RqntNVcmqxqdOETd/V6GmXO40lqopa24VDIKaJuXyPXCIZTpNlTtE1+uramF8djtf9u3skTCvenXjxyq9+6nUBsCdCEkJ0ISAAAAAAAAAAAAAAACMgSeavoqa40ktJWwsnppm7skUiZa5Cg6w2jz013XTujqBbre+h/XHD480yqcs80RO3qOfHpXahc049w1hDQPdz4FM3KN7uSJ+qgRVbM75pyrkq9nl+dRxyO3n0NWuY188Ki+aZ7z69p2x/6fYrN2cbKev0v2Pr4D2g/WDL+W7+R8B7QfrBl/Ld/IH5U+zO+akq46vaJfnVjI3ZbQ0i7rEXxwmOXYme81Gho6a30sdLRQRwU8Td2OONuEanYhmfwHtB+sGX8t38nxJpXahbG8e36whr3t58CobhH93NF/YDVwZxo3aPUVN3TTusaD3Ve+hnVHN2Y5rhV8VRepeo0ZFRegCQAAAAAAAAAAAAAq20zUD9NaNr7hA7dqd1IoF7HuXCL5c18i0lX2h6RTWljjtjq11IjKlk3ERm/nCKmMZTqcoHO2TaTi07puConZvXOvYk9VK7m75uaNz2Jn1ypeETCYIiYkcTI29DWoieR9AAAAIVMkgCi7WdJxai0zPUQsxc7ex09LK3k7lzVuexceuDo7M9QP1No2guE7t6p3VinXte3kq+fJfMs0rElifG7ociovmVrZ5pFNF2KS1trXVaPqHzcRY9zGURMYyvU0C0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k="
            }
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
