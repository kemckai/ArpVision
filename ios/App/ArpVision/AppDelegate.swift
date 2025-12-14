//
//  AppDelegate.swift
//  ArpVision Native
//
//  Optional AppDelegate for native iOS app lifecycle management
//  Note: This file is optional since we're using SwiftUI with @main in ArpVisionApp.swift
//  You can delete this file if you don't need UIKit lifecycle methods
//

import UIKit

class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        return true
    }
    
    // MARK: UISceneSession Lifecycle (optional for SwiftUI)
    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }
}
