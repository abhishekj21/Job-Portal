import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    // If the URL contains ?sign-in=true, the modal(signUp and signIn page) is opened automatically
    if (search.get("sign-in") === "true") {
      setShowSignIn(true);
    }
  }, [search]);
  // if i will click anywhere on the screen except the auth modal, it will close
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setShowSignIn(false);
    setSearch({ "sign-in": false });
  };
  return (
    <>
      <nav className="container mx-auto py-4 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="h-12 md:h-16 lg:h-20" />
        </Link>

        {/* <Button variant="outline">Login</Button> */}
        <div className="flex gap-8">
          <SignedOut>
            {/* <SignInButton /> */}
            {/* if we are not signIn means signOut then login button will appear and when we click at that login button then auth form is popup at screen when showSignIn become true */}
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {/* add a condition here */}
            <Button variant="destructive" className="rounded-full">
              <PenBox size={20} className="mr-2" />
              Post a job
            </Button>
            <Link to="/post-job"></Link>
            <UserButton>
              <UserButton.MenuItems>
                {/* after login when i click at user profile then there you can find this like -> Saved Jobs,My Jobs sections  */}
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {/* here is that form of auth  */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
